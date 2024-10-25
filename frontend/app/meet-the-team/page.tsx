import Image from 'next/image'

export default function TeamPage() {
  return (
    <>
    <div className="bg-maroon-800 min-h-screen text-white w-screen overflow-hidden">
      {/* Header Section */}
      <section className="text-center pt-0 pb-12">
        <h1 className="text-8xl font-satoshi mb-6 mt-0">MEET THE TEAM</h1>
        <div className="w-10/12 h-1 bg-white mt-4 mb-6 mx-auto"></div>
        <div className="relative w-full h-[48rem] flex justify-center">
              <Image 
            src="/test.jpg" 
            alt="Campus view"
            layout="fill"
            style={{ objectFit: 'contain' }}
            />
        </div>
      </section>

      {/* Team Members Section */}
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      <TeamCard name="Jadon" imageSrc="/test.jpg" />
      <TeamCard name="Alexander" imageSrc="/test.jpg" />
      <TeamCard name="Sean" imageSrc="/test.jpg" />
      <TeamCard name="Angela" imageSrc="/test.jpg" />
    </section>
    </div>
    </>
  )
}

// TeamCard Component
function TeamCard({ name, imageSrc }) {
  return (
    <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105">
      <Image 
        src={imageSrc}
        alt={name}
        width={300}
        height={300}
        className="w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </div>
  )
}
