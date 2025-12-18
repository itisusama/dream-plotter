export default function MainHeading({ title }: { title: string; }) {
    return(
        <div data-aos="fade-down">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold">{title}</h1>
        </div>
    )
}