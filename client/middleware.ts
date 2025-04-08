import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const accessToken = req.cookies.get("access_token")?.value;
    console.log(pathname, accessToken);
}
