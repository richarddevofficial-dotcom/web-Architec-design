export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-accent"></div>
        <div className="mt-4 text-center text-gray-600 font-medium">
          Loading...
        </div>
      </div>
    </div>
  );
}
