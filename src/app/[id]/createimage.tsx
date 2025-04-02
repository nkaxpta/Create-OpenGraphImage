import satori from "satori";
import sharp from "sharp";
import fs from "fs";
import { BLOG_TITLE, PROFILE_IMAGE_URL } from "~/constants/constants";

export const writeOgpImage = async (title: string, id: string) => {
  // ディレクトリが存在しなければ作成する
  //   if (!fs.existsSync(id)) fs.mkdirSync(path);
  const image = await generateOgpImage(title);
  fs.writeFileSync(`og-images/${id}.png`, new Uint8Array(image));
};

const generateOgpImage = async (title: string): Promise<Buffer> => {
  const fontMedium = fs.readFileSync("public/font/NotoSansJP-Regular.ttf");
  const fontBold = fs.readFileSync("public/font/NotoSansJP-Bold.ttf");

  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        backgroundImage: "linear-gradient(135deg, #7dc7f8 10%, #027cd9 100%)",
        color: "#f3f3f3",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3rem 4rem 2.5rem",
          backgroundColor: "#181b29",
          justifyContent: "space-between",
          borderRadius: "10px",
          width: "100%",
          height: "90%",
        }}
      >
        <p style={{ fontSize: 60, fontWeight: 700 }}>{title}</p>

        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={PROFILE_IMAGE_URL}
            alt=""
            width={110}
            height={110}
            style={{
              padding: "0.5rem",
              border: "1px solid #333545",
              borderRadius: "100%",
            }}
          />
          <p style={{ marginLeft: "16px", fontSize: 40, fontWeight: 500 }}>
            {BLOG_TITLE}
          </p>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Noto Sans JP",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
};
