import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import fs from "fs/promises";
// import { notFound } from "next/navigation";

export async function GET(req: NextRequest, { params : {id} }: { params: { id: string }}) {
    const product = await db.product.findUnique({ where: { id }, select: { filePath: true, name: true } })

    if (product === null) return new Response("Product not found", { status: 404 })
    const { size } = await  fs.stat(product.filePath)
    const file = await  fs.readFile(product.filePath)
    const extension = product.filePath.split(".").pop()
        
    return new NextResponse(file, { headers: 
        { "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
         "Content-Length": size.toString()
        }
    })
}

// export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
//     try {
//         const product = await db.product.findUnique({ where: { id }, select: { filePath: true, name: true } });

//         if (product === null) {
//             console.error(`Product not found: ${id}`);
//             return new Response("Product not found", { status: 404 });
//         }

//         console.log(`Product file path: ${product.filePath}`);

//         if (!existsSync(product.filePath)) {
//             console.error(`File not found at path: ${product.filePath}`);
//             return new Response("File not found", { status: 404 });
//         }

//         const { size } = await fs.stat(product.filePath);
//         const file = await fs.readFile(product.filePath);
//         const extension = path.extname(product.filePath).slice(1);

//         console.log(`File size: ${size}, Extension: ${extension}`);

//         return new NextResponse(file, {
//             headers: {
//                 "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
//                 "Content-Length": size.toString(),
//                 "Content-Type": "application/octet-stream"
//             }
//         });
//     } catch (error) {
//         console.error('Error in download route:', error);
//         return new Response("Internal Server Error", { status: 500 });
//     }
// }