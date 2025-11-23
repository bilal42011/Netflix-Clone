import Banner from "./Banner";
import { homeScreenBanneStyles } from "../assets";
import Input from "./Input";
import Button from "./Button";

const HomeScreenBanner = () => {
    return (
        <Banner wrapperCustomClass="home__banner__wrapper"
            image="https://assets.nflxext.com/ffe/siteui/vlv3/b85863b0-0609-4dba-8fe8-d0370b25b9ee/aa3f04db-986c-4e24-b93a-d2728a853ad2/PK-en-20230731-popsignuptwoweeks-perspective_alpha_website_medium.jpg">
            <div className="home__banner__contents">
                <h1 className="home__banner_title">Unlimited movies, TV shows, and more</h1>
                <p className="home__banner__desc">Watch anywhere. Cancel anytime.</p>
                <div className="home__banner__signup-wrapper">
                    <p className="home__banner__singup-desc">Ready to watch? Enter your email to create or restart your membership.</p>
                    <div className="home__banner__signup-form">
                        <Input type="text"
                            customWrapperClass="home__banner__input-wrapper" />
                        <Button customButtonClass="get-started__button">
                            Get Started
                            <div style={{ height: "1.5rem" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-mirrorinrtl="true"  data-name="ChevronRight" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor"></path></svg>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </Banner>
    )
}

export default HomeScreenBanner