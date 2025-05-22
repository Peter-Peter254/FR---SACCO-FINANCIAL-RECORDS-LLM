'use client';

import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { LayoutContext } from '@/layout/context/layoutcontext';
import ReactMarkdown from 'react-markdown';
import { ApiService } from '@/services/apiServices';

const ChatPage = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);
    const [docName, setDocName] = useState('');

    const { layoutConfig } = useContext(LayoutContext);
    const isDark = layoutConfig.colorScheme === 'dark';

    const wrapperBg = isDark ? '#1e1e2f' : '#fff';
    const messageBgUser = isDark ? '#30598c' : '#d1e7ff';
    const messageBgBot = isDark ? '#33384d' : '#f0f0f0';
    const inputBg = isDark ? '#2d2d3f' : '#fff';
    const borderColor = isDark ? '#444' : '#ccc';
    const chatAreaBg = isDark ? '#2a2a3a' : '#f9f9f9';

    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            try {
                const doc = await ApiService.get(`/documents/${id}`, true);
                setDocName(doc.name || 'Unknown Document');

                const history = await ApiService.get(`/chat/${id}/${userId}`);
                setMessages(history || []);
            } catch (err) {
                setMessages([]);
            }
        };

        fetchData();
    }, [id, userId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || !userId) return;

        const userMsg = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const data = await ApiService.post(`/chat/${id}`, { query: input, userId });
            const aiMsg = { sender: 'bot', text: data.response || 'No response from GPT.' };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (err) {
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Failed to get response' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };

    const clearChat = async () => {
        if (!userId) return;
        if (!window.confirm('Are you sure you want to clear this chat?')) return;

        try {
            await ApiService.delete(`/chat/${id}/${userId}`);
            setMessages([]);
        } catch (err) {
            alert('Failed to clear chat.');
        }
    };

    const exportChat = () => {
        const chatText = messages.map((msg) => `${msg.sender === 'user' ? 'You' : 'Bot'}: ${msg.text}`).join('\n\n');
        const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `chat-${id}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex justify-center items-center" style={{ height: '80vh', padding: '1rem', backgroundColor: isDark ? '#121212' : '#f0f2f5' }}>
            <div
                className="chat-wrapper"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    maxWidth: '80%',
                    minWidth: '320px',
                    backgroundColor: wrapperBg,
                    borderRadius: '8px',
                    padding: '1rem',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    margin: '0 auto',
                    color: isDark ? '#eaeaea' : '#000'
                }}
            >
                <div className="flex justify-between items-center mb-4" style={{ lineHeight: 1 }}>
                    <div className="text-lg font-semibold flex items-center">Explore:&nbsp;{docName || id}</div>
                    <div className="flex items-center gap-2">
                        <Button icon="pi pi-trash" className="p-button-sm p-button-text p-button-danger" onClick={clearChat} label="Clear" />
                        <Button icon="pi pi-download" className="p-button-sm p-button-text p-button-secondary" onClick={exportChat} label="Export" />
                    </div>
                </div>

                <div
                    style={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        backgroundColor: chatAreaBg,
                        padding: '1rem',
                        borderRadius: '8px',
                        border: `1px solid ${borderColor}`,
                        marginBottom: '1rem',
                        minHeight: 0
                    }}
                >
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                marginBottom: '1rem'
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: msg.sender === 'user' ? messageBgUser : messageBgBot,
                                    padding: '0.75rem 1rem',
                                    borderRadius: '16px',
                                    borderTopLeftRadius: msg.sender === 'user' ? '16px' : '0',
                                    borderTopRightRadius: msg.sender === 'user' ? '0' : '16px',
                                    maxWidth: '75%',
                                    wordBreak: 'break-word',
                                    color: isDark ? '#f2f2f2' : '#000'
                                }}
                            >
                                {msg.sender === 'bot' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div className="relative" style={{ flexShrink: 0 }}>
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        rows={1}
                        placeholder="let's Chat Finances"
                        style={{
                            width: '100%',
                            borderRadius: '24px',
                            padding: '0.75rem 3.5rem 0.75rem 1rem',
                            resize: 'none',
                            fontSize: '1rem',
                            backgroundColor: inputBg,
                            color: isDark ? '#fff' : '#000',
                            border: `1px solid ${borderColor}`,
                            lineHeight: '1.4',
                            maxHeight: '150px',
                            overflowY: 'auto'
                        }}
                    />

                    <Button
                        icon="pi pi-send"
                        onClick={sendMessage}
                        loading={loading}
                        className="p-button-sm p-button-rounded p-button-primary"
                        style={{
                            position: 'absolute',
                            right: '0.5rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            height: '2.5rem',
                            width: '2.5rem'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
