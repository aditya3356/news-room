const ListItem = ({title, author, points, createdAt, numComments}) => {
    const timeElapsed = (createdAt) => {
        const diffInMillis = Date.now() - (createdAt*1000);
        const years = diffInMillis/31536000000;
        if (Math.floor(years)) {
            return `${Math.floor(years)} year${Math.floor(years) > 1? 's': ''} ago |`;
        }
        const months = years*12;
        if (Math.floor(months)) {
            return `${Math.floor(months)} month${Math.floor(months) > 1? 's': ''} ago |`;
        }
        const days = months*30;
        if (Math.floor(days)) {
            return `${Math.floor(days)} day${Math.floor(days) > 1? 's': ''} ago |`;
        }
        const hours = days*24;
        if (Math.floor(hours)) {
            return `${Math.floor(hours)} hour${Math.floor(hours) > 1? 's': ''} ago |`;
        }
        const minutes = hours*60;
        if (Math.floor(minutes)) {
            return `${Math.floor(minutes)} minute${Math.floor(minutes) > 1? 's': ''} ago |`;
        }
        const seconds = minutes*60;
        if (Math.floor(seconds)) {
            return `${Math.floor(seconds)} second${Math.floor(seconds) > 1? 's': ''} ago |`;
        }
    };

    return (
        <div className="p-3 flex flex-col items-start mb-3 cursor-pointer box-border rounded-md shadow-[4px_0_16px_10px_rgba(30,30,30,0.08)]">
            <div className="text-lg font-bold">{title}</div>
            <div className="flex text-sm">
                <div className="mr-2">
                    {points} points |
                </div>
                <div className="mr-2">
                    {author} |
                </div>
                <div className="mr-2">
                {
                    timeElapsed(createdAt)
                }
                </div>
                <div>
                    {numComments} comments
                </div>
            </div>
        </div>
    )
};

export default ListItem;