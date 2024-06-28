import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full gap-10 max-md:m-5">
      <div className="flex basis-1/6 justify-center items-center  w-full">
        <span className="head_text text-2xl">The Ideal Spot to Organize Fun Activities</span>
      </div>
      <div className="flex basis-4/6  w-full h-full">
        <div className="flex flex-col gap-2 text-left md:px-20">
          <span className="points font-serif">Looking for the perfect place to play your favorite outdoor games?</span>
          <span className="points font-serif">Our ground offers the ideal setting for a wide range of fun activities. Whether you're planning a soccer match, a cricket game, or a friendly round of frisbee, our well-maintained field is ready to host your event.</span>
          <span className="points font-serif">With ample space, excellent facilities, and convenient booking options, you can focus on having fun while we take care of the rest. </span>
          {/* <span className="font-serif">Our ground isn't just about the game—it's about the experience. Surrounded by lush greenery and equipped with top-notch amenities, it provides a refreshing escape from the hustle and bustle of everyday life. </span> */}
          <span className="points font-serif">Whether you're a seasoned athlete or just looking for a casual day out, our venue caters to all skill levels and age groups. Plus, with on-site parking and easy access to public transport, getting here is a breeze.</span>
          <span className="points font-serif">So, gather your team, lace up your sneakers, and come create unforgettable memories on our field. Book now and let the games begin!</span>
        </div>
        <div className="hidden xl:flex justify-center w-full h-full">
          <div className="card">
            <div className="homeCardFront">
              <Image src='/images/football3.png' alt='football' fill/>
            </div>
            <div className="homeCardBack">
            <Image src='/images/football3.png' alt='football' fill/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row basis-1/6 justify-center items-center gap-10">
        <Link className="flex items-center gap-1 bg-blue-600 hover:bg-blue-900 px-5 py-2 rounded-lg border-2 border-black text-white" href={'/grounds'}>
          <span>See Grounds? </span>
          <Image className="hidden md:flex" src='/images/rightarrow2.png' alt='rightarrow' width={50} height={20} />
        </Link>
        <Link className="flex items-center gap-1 bg-gray-500 hover:bg-gray-700 px-5 py-2 rounded-lg border-2 border-black text-black" href={'/mybookings'}>
          <Image className="hidden md:flex" src='/images/rightarrow1.png' alt='rightarrow' width={50} height={20} />
          <span>Check Your Bookings?</span>
        </Link>
      </div>
      <div className="-z-10 opacity-10">
        <Image src='/images/football1.png' alt='football' fill />
      </div>
    </div>
  );
}
