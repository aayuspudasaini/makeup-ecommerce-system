import { AppointmentBookingForm } from "./_components/appointment-booking-form";
import { TestomonialCarousel } from "./_components/testomonial-carousel";

export default function AppointmentBookingPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-4 flex-col-reverse">
            <TestomonialCarousel />
            <div className="flex flex-col h-full w-full justify-center p-8 md:p-16 gap-y-2.5 items-center">
                <h5 className="text-2xl font-bold capitalize text-center">
                    Book an appointment for your special ocassions.
                </h5>
                <p className="text-md text-muted-foreground text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur saepe culpa.
                </p>
                <div className="w-full mt-4">
                    <AppointmentBookingForm />
                </div>
            </div>
        </div>
    );
}
