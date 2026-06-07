mport { GalleryPage } from ‘@/components/GalleryPage’;
import { getGallery } from ‘@/lib/getGallery’;

export default async function Page() {
const media = await getGallery(‘jewellery’);

return (
);
}
