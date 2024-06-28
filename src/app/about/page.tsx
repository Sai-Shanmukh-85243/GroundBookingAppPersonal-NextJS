import Image from "next/image";
const About = () => {
    return (
        <div className="flex h-full w-full">
            <div className="flex flex-col gap-6 my-5 mx-10">

                <span className="text-2xl font-semibold self-center bg-clip-text bg-gradient-to-l from-slate-700 to-purple-400 text-transparent">
                    About Us
                </span>
                <div className="flex flex-col gap-4">
                    <span className="text-sm font-serif">
                        Welcome to our premier outdoor sports facility, where fun and fitness come together in the perfect blend. We are dedicated to providing a top-quality venue for all your favorite outdoor games, ensuring that every visit is enjoyable and memorable.
                    </span>

                    <div className="flex flex-col gap-2">
                        <span className="text-xl font-semibold">
                            Our Mission
                        </span>
                        <span className="text-sm font-serif">
                            Our mission is to create an inclusive and vibrant community space where people of all ages and abilities can come together to play, exercise, and socialize. We believe in the power of sports to bring people together, promote health, and foster a sense of camaraderie.
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xl font-semibold">
                            Our Community
                        </span>
                        <span className="text-sm font-serif">
                            We pride ourselves on being more than just a sports facility. We are a hub for community activities, hosting local tournaments, friendly matches, and social events. Our ground is a place where families, friends, and neighbors can connect and share their love of sports in a welcoming environment.
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xl font-semibold">
                            Why Choose Us?
                        </span>

                        <div className="flex flex-col gap-2 text-left md:px-20">
                            <span className="points font-serif text-sm"><span className="font-semibold">Quality:&nbsp;</span> Our fields are among the best maintained in the area, providing a safe and enjoyable playing experience.</span>
                            <span className="points font-serif text-sm"><span className="font-semibold">Convenience:&nbsp;</span> With easy booking options and excellent facilities, organizing your event is hassle-free.</span>
                            <span className="points font-serif text-sm"><span className="font-semibold">Community:&nbsp;</span> Join a community of sports enthusiasts who share your passion and energy.</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xl font-semibold">
                                Join Us
                            </span>
                            <span className="text-sm font-serif">
                                Whether you're looking to book a field for a competitive match or planning a casual day out with friends and family, we are here to provide the perfect setting. Explore our facilities, check availability, and make a reservation today to experience the best in outdoor sports.
                            </span>
                        </div>
                        <br />
                        <span className="text-sm font-serif italic">
                            Come play, compete, and have fun with us!
                        </span>
                    </div>
                </div>
            </div>
            <div className="-z-10 opacity-10">
                <Image src='/images/cricket1.png' alt='cricket' fill />
            </div>
        </div>
    )
}

export default About;