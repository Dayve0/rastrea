// app/icon.tsx
import { ImageResponse } from "next/og";

export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#7c3aed", // Roxo vibrante idêntico à imagem
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%", // Formato circular perfeito
                }}
            >
                <svg
                    xmlns="http://w3.org"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff" // Linhas em branco
                    strokeWidth="2.5" // Linhas ligeiramente mais grossas para destacar no Favicon
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19.07 4.93a10 10 0 0 0-14.14 0" />
                    <path d="M16.24 7.76a6 6 0 0 0-8.49 0" />
                    <path d="M12 12v.01" />
                    <path d="M12 12a1 1 0 0 0-1-1" />
                    <path d="M12 12a1 1 0 0 0 1-1" />
                    <path d="M12 12a1 1 0 0 0-1 1" />
                    <path d="M12 12a1 1 0 0 0 1 1" />
                    <path d="M19.07 19.07A10 10 0 0 0 12 2" />
                </svg>
            </div>
        ),
        { ...size }
    );
}
