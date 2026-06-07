import cloudinary from "./cloudinary";

export async function getGallery(folder: string) {
  const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by("created_at", "desc")
    .max_results(500)
    .execute();

  return result.resources.map((item: any) => ({
    src: item.secure_url,
    type: item.resource_type === "video" ? "video" : "image",
    alt: folder,
    width: item.width,
    height: item.height,
  }));
}
