export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#e0fbfc] text-[#3d5a80] font-heading">
      <div className="w-16 h-16 border-4 border-[#3d5a80] border-dashed rounded-full animate-spin mb-6"></div>
      <p className="text-2xl animate-bounce">Loading ...</p>
    </div>
  );
}
