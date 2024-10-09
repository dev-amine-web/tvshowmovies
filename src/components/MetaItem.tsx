import { memo } from "react";

const MetaItem: React.FC<{title:string,content: string }> = memo(({ title, content }) => {
    return (
        <div className={`flex items-center space-x-4`}>
            <p className={`text-sm sm:text-lg md:text-xl font-bold text-gray-400`}>{title}</p>
            <p className={`text-sm sm:text-lg md:text-xl text-white`}>{content}</p>
        </div>
    );
});

export default MetaItem;