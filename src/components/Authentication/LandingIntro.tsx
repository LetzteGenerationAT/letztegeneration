import Image from 'next/image'
import TemplatePointers from './TemplatePointers'

function LandingIntro() {
  return (
    <div className="min-h-full hero rounded-l-xl bg-base-200">
      <div className="py-12 hero-content">
        <div className="max-w-md">
          <Image
            src="/logo-full.png"
            alt="Letzte Generation"
            width={300}
            height={100}
          />
          {/* Importing pointers component */}
          <TemplatePointers />
        </div>
      </div>
    </div>
  )
}

export default LandingIntro
