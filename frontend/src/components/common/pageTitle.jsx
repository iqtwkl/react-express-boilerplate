const PageTitleComponent = ({ title }) => {
    return (
        <div className="mt-4">
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
                {title}
            </h1>
        </div>
    );
};

export default PageTitleComponent;
