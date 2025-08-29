'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
const NotFound: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <p className="text-6xl font-bold text-gray-800">404</p>
      <p className="mt-4 text-lg text-gray-600">Halaman yang Anda cari tidak ditemukan.</p>
      <Button className="mt-6" onClick={() => router.push('/')}>
        Kembali ke Beranda
      </Button>
    </div>
  );
};

export default NotFound;
