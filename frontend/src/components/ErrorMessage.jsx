function ErrorMessage({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
            <div className="glass-effect p-8 max-w-md text-center">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-2xl font-bold mb-2 text-red-400">Oops!</h3>
                <p className="text-gray-300 mb-6">
                    {message || 'Something went wrong. Please try again.'}
                </p>
                {onRetry && (
                    <button onClick={onRetry} className="btn-primary">
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}

export default ErrorMessage;
