import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Adapty – In-App Subscription Infrastructure";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FAFAFA",
                    backgroundImage: "radial-gradient(circle at 25% 25%, rgba(103, 32, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(103, 32, 255, 0.05) 0%, transparent 50%)",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 40,
                    }}
                >
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 32 32"
                        fill="none"
                    >
                        <rect width="32" height="32" rx="8" fill="#6720FF" />
                        <path
                            d="M16 8L22 12V20L16 24L10 20V12L16 8Z"
                            fill="white"
                        />
                    </svg>
                </div>

                {/* Title */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 700,
                            color: "#09090B",
                            marginBottom: 16,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Adapty
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 500,
                            color: "#52525B",
                            textAlign: "center",
                            maxWidth: 800,
                        }}
                    >
                        In-App Subscription Infrastructure
                    </div>
                </div>

                {/* Tagline */}
                <div
                    style={{
                        display: "flex",
                        marginTop: 48,
                        gap: 32,
                        color: "#71717A",
                        fontSize: 20,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#6720FF" }} />
                        Paywalls
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#6720FF" }} />
                        A/B Testing
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#6720FF" }} />
                        Analytics
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#A1A1AA",
                        fontSize: 18,
                    }}
                >
                    Trusted by 15,000+ apps worldwide
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
