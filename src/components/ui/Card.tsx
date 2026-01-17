import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
    shadow?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'elevated' | 'gradient';
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
    shadow = 'md',
    variant = 'default',
    onClick
}) => {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    const shadowClasses = {
        sm: 'shadow-sm',
        md: 'shadow-lg',
        lg: 'shadow-2xl'
    };

    const variantClasses = {
        default: 'bg-white border border-gray-200',
        elevated: 'bg-white border-0 shadow-xl',
        gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'
    };

    const classes = `rounded-xl ${paddingClasses[padding]} ${shadowClasses[shadow]} ${variantClasses[variant]} ${className} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`;

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card; 