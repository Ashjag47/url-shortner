import UrlResponse from '@/models/UrlResponse';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Copy, Download, Trash } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { deleteUrl } from '@/utils/apiUrls';
import { BeatLoader } from 'react-spinners';

interface LinkCardProps {
  url: UrlResponse;
  fnGetUrls: (...args: unknown[]) => Promise<void>;
}

const LinkCard = (props: LinkCardProps) => {
  const { url, fnGetUrls } = props;
  const { loading: deleting, fn: fnDeleteUrl } = useFetch(() =>
    deleteUrl(url.id)
  );

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(
      `https://trimrr.in/${url?.custom_url ? url?.custom_url : url?.short_url}`
    );
  };

  const handleQRDownload = () => {
    if (url.qr) {
      const link = document.createElement('a');
      link.href = url.qr;
      link.download = `${url?.title ? url?.title : url?.short_url}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('QR code not available');
    }
  };

  const HandleLinkDelete = () => {
    fnDeleteUrl().then(() => {
      fnGetUrls();
    });
  };

  return (
    <div key={url.id} className="flex justify-between items-center mt-5">
      {/* display QR image */}
      <img
        src={url.qr}
        alt="qr-code"
        className="h-32 object-contain ring ring-blue-500 self-start mr-3"
      />
      <Link to={`/link/${url.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover: underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          https:trimrr.in/{url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at || '').toLocaleString()}
        </span>
      </Link>
      {/* action buttons */}
      <div className="flex gap-2">
        <Button
          variant={'ghost'}
          className="bg-blue-950"
          onClick={handleLinkCopy}
        >
          <Copy />
        </Button>
        <Button
          variant={'ghost'}
          className="bg-blue-950"
          onClick={handleQRDownload}
        >
          <Download />
        </Button>
        <Button
          variant={'ghost'}
          className="bg-blue-950"
          onClick={HandleLinkDelete}
        >
          {deleting ? <BeatLoader color="#36d7b7" size={5} /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
