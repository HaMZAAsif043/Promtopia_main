import Feed from "@components/Feed";
const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share Prompts
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">AI-Powered Prompts</span>
            </h1>
                <p className="desc text-center">
                    Prompts Sharing is a platform where you can discover and share prompts for your writing, drawing, or any other creative work.
                </p>
            <Feed />
        </section>
    )
}

export default Home
