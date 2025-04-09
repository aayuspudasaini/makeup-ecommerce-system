export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-1.5">
            <div className="border-2 border-gray-600/40  animate-spin transition-all h-6 w-6 rounded-full border-t-primary dark:border-t-gray-50" />
            <span className="text-sm font-medium">Loading...</span>
        </div>
    );
}
