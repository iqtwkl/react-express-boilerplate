const PageTitleComponent = ({title}) => {
    return (
        <div className="mt-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {title}
            </h1>
        </div>
    )
}

export default PageTitleComponent;