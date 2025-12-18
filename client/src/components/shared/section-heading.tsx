type sectionHeadingProps = {
    heading: string,
}
export default function SectionHeading({ heading} : sectionHeadingProps ) {
    return(
        <>
        <div className="bg-primary py-2 w-full text-center border-l-0 border-t-0 border-b-2 border-r-2 border-black rounded-full">
        <h2 className="text-white">
          {heading}
        </h2>
      </div>
        </>
    )
}