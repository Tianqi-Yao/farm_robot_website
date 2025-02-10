import { NextApiRequest, NextApiResponse } from "next";

let nodes: { lat: number; lng: number; id: number }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { lat, lng } = req.body;

        if (lat && lng) {
            const newNode = { lat, lng, id: nodes.length };
            nodes.push(newNode);
            console.log("Received new location:", newNode);
            res.status(200).json({ success: true, nodes });
        } else {
            res.status(400).json({ success: false, message: "Missing lat/lng" });
        }
    } else if (req.method === "GET") {
        res.status(200).json({ nodes });
    } else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
