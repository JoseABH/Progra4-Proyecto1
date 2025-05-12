// src/components/StatusBadge.tsx

import React from 'react';
import { User } from '../types/user';

export const StatusBadge: React.FC<{ type: User['role'] }> = ({ type }) => {
    const styles = {
        'admin': 'bg-yellow-100 text-yellow-800',
        'user': 'bg-gray-100 text-gray-600',
        'moderator': 'bg-green-100 text-green-800',
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'aprobada': 'bg-green-100 text-green-800',
    };

    return (
        <span className={`text-xs px-2 py-1 rounded-full ${styles[type] || 'bg-gray-100 text-gray-800'}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
    );
};
