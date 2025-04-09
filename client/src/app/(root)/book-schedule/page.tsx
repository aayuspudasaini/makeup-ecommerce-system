import { Container } from "@/components/global/container";
import Image from "next/image";

export default function ScheduleBookingPage() {
    return (
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>{/* Schedule Booking Form */}</div>

            <div className="h-full w-full">
                <Image
                    src="/images/booking-schedule-image.jpg"
                    alt="Makeup Image"
                    width={1200}
                    height={800}
                    className="w-ful h-full object-cover"
                />
            </div>
        </Container>
    );
}
