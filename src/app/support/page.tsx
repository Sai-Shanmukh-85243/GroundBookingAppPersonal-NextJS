import Image from "next/image";

const Support = () => {
    return (
        <div className="flex h-full w-full">
            <div className="flex flex-col gap-6 my-5 mx-10">

                <span className="text-2xl font-semibold self-center bg-clip-text bg-gradient-to-l from-purple-500 to-slate-800 text-transparent">
                    Support
                </span>
                <div className="flex flex-col gap-4">
                    <span className="text-sm font-serif">
                        We're here to help! Whether you have questions about our facilities, need assistance with booking, or require support during your visit, our dedicated team is ready to assist you. Your satisfaction and enjoyment are our top priorities.
                    </span>
                    <div className="flex flex-col gap-2 font-serif">
                        <span className="text-xl font-semibold">
                            How Can We Help?
                        </span>
                        <div className="flex flex-col gap-1 text-sm">
                            <span className="font-semibold">
                                Frequently Asked Questions (FAQs)
                            </span>
                            <span className="points">
                                Visit our FAQ section to find answers to common questions about our facilities, booking process, and more.
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 font-serif">
                        <span className="text-xl font-semibold">
                            Contact Us
                        </span>
                        <div className="points text-sm">
                            <span className="font-semibold">
                                Phone:&nbsp;
                            </span>
                            <span >
                                Reach us directly at [Your Phone Number] for immediate assistance.
                            </span>
                        </div>
                        <div className="points text-sm">
                            <span className="font-semibold">
                                Email:&nbsp;
                            </span>
                            <span >
                                Send your inquiries to [Your Email Address], and we'll get back to you as soon as possible.
                            </span>
                        </div>
                        <div className="points text-sm">
                            <span className="font-semibold">
                                Address:&nbsp;
                            </span>
                            <span >
                                [Your Physical Address] - stop by and speak with our team in person.
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 font-serif">
                        <span className="text-xl font-semibold">
                            Booking Support
                        </span>
                        <div className="flex flex-col text-sm gap-1">
                            <span className="mb-1">
                                Need help with your reservation? Our booking support team can assist you with:
                            </span>

                            <span className="points">
                                Checking field availability
                            </span>
                            <span className="points">
                                Modifying or canceling your booking
                            </span>
                            <span className="points">
                                Understanding our booking policies
                            </span>

                        </div>
                    </div>
                    <div className="flex flex-col gap-2 font-serif">
                        <span className="text-xl font-semibold">
                            Feedback and Suggestions
                        </span>
                        <div className="flex flex-col gap-1 text-sm">
                            <span>
                                We value your feedback! If you have any suggestions on how we can improve our services or if you'd like to share your experience, please let us know. Your input helps us enhance our facilities and services.
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 font-serif">
                        <span className="text-xl font-semibold">
                            Feedback Form
                        </span>
                        <div className="flex flex-col gap-1 text-sm">
                            <span className="points">
                                Fill out our online feedback form to share your thoughts and experiences with us.
                            </span>
                        </div>
                    </div>

                    <span className="font-serif text-sm italic">
                        Thank you for choosing our sports facility. We are committed to providing you with the best possible experience and are always here to support you. Enjoy your time with us!
                    </span>

                </div>
            </div>
            <div className="-z-10 opacity-10">
                <Image src='/images/basketball1.png' alt='basketball' layout="fill" />
            </div>
        </div>
    )
}

export default Support;