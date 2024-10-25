import Image from 'next/image'

export default function TeamPage() {
  return (
    <>
    <div className="bg-maroon min-h-screen text-white w-screen overflow-hidden">
      {/* Header Section */}
      <section className="text-center pt-10 pb-12">
        <h1 className="text-8xl font-light mt-0">MEET THE TEAM</h1>
        <div className="w-10/12 h-0.5 bg-white mt-10 mb-20 mx-auto"></div>
        <div className="relative w-full h-[60rem] flex justify-center">
          <Image 
            src="/test.jpg" 
            alt="Campus view"
            fill
            style={{ objectFit: 'contain'}}
            className="filter brightness-100"
          />
          <div className="absolute inset-0 bg-maroon opacity-30"></div>
        </div>
      </section>

      {/* Team Members Section */}
    <section className="grid grid-cols-1 font-satoshi sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      <TeamCard name="Jadon Lee" imageSrc="/jadon.jpg" />
      <TeamCard name="Alex Bui" imageSrc="/alex.jpg" />
      <TeamCard name="Sean" imageSrc="/sean.gif" />
      <TeamCard name="Angela" imageSrc="/angela.jpg" />
    </section>
    </div>
    </>
  )
}

// TeamCard Component
function TeamCard({ name, imageSrc }) {
  return (
    <div className="bg-maroon text-white rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105">
      <div>
      <Image 
        src={imageSrc}
        alt={name}
        width={300}
        height={300}
        className="w-full object-cover"
      />
      <div className="absolute inset-0 bg-maroon opacity-10"></div>

      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </div>
  )
}
