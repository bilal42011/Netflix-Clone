import { bannerStyles } from "@/assets";


const Banner = ({ children, image, wrapperCustomClass }) => {
    console.log(children);
    return (
        <div className={`banner ${wrapperCustomClass}`}>
            <div className="banner__img-gradient">
                <img src={image}
                    className="banner__img" />
                <div className="banner__gradient"></div>
            </div>
            {children}
        </div>
    )
}

export default Banner