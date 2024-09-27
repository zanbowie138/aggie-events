import React from 'react'

export interface ToastType {
    id: number;
    message: string;
    type: string;
    fading?: boolean;
}

class ToastManager {
    toasts: ToastType[];
    addToastCallback: (message: string, type: string, timeout: number) => void;

    constructor() {
        this.toasts = [];
    }

    public setAddNotificationCallback(callback) {
        this.addToastCallback = callback;
    }

    public addToast(message, type, timeout = 1000) {
        this.addToastCallback(message, type, timeout);
    }
}

export default new ToastManager();
