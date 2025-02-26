import Image from 'next/image';

export default function PreviewCard({ url, title }: { url: string; title: string }) {
  // Using server-side API route to securely handle the screenshot request
  const thumbnailUrl = `/api/screenshot?url=${encodeURIComponent(url)}`;
  
  return (
    <div className="preview-card w-full">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        <Image 
          src={thumbnailUrl}
          alt={`Preview of ${title}`}
          fill
          className="object-cover hover:opacity-90 transition-opacity"
        />
      </div>
    </div>
  );
}
