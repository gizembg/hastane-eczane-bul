export default function LogoIcon({
    size = 18, // or any default size of your choice
    color = "black" // or any color of your choice
}) {
    return (
        <svg
            transform='scale(0.4)'
            xmlns="http://www.w3.org/2000/svg"
        // viewBox="0 0 24 24"
        // width={size} // added size here
        // height={size} // added size here
        //fill={color} // added color here
        >
            <defs>
                <clipPath id="clip-path">
                    <rect id="Rectangle_1662" data-name="Rectangle 1662" width="51.565" height="47.384" fill="#fff" stroke="#ff6464" stroke-width="1" />
                </clipPath>
                <clipPath id="clip-path-2">
                    <rect id="Rectangle_1663" data-name="Rectangle 1663" width="40.202" height="41.81" fill="#ff6464" stroke="#707070" stroke-width="1" />
                </clipPath>
            </defs>
            <g id="Group_10139" data-name="Group 10139" transform="translate(0 0)">
                <path id="Subtraction_1" data-name="Subtraction 1" d="M67.325,134.006a16.2,16.2,0,0,1-3.241-.327,15.993,15.993,0,0,1-5.75-2.42,16.128,16.128,0,0,1-5.826-7.075,16,16,0,0,1-.937-3.019,16.2,16.2,0,0,1-.327-3.241V83.084H16.081a16.2,16.2,0,0,1-3.241-.327,15.992,15.992,0,0,1-5.75-2.42,16.128,16.128,0,0,1-5.826-7.075,16,16,0,0,1-.937-3.019,16.237,16.237,0,0,1,0-6.482,15.992,15.992,0,0,1,2.42-5.75,16.128,16.128,0,0,1,7.075-5.826,16,16,0,0,1,3.019-.937,16.2,16.2,0,0,1,3.241-.327H51.244V16.081a16.2,16.2,0,0,1,.327-3.241,15.992,15.992,0,0,1,2.42-5.75,16.128,16.128,0,0,1,7.075-5.826A16,16,0,0,1,64.084.327a16.237,16.237,0,0,1,6.482,0,15.992,15.992,0,0,1,5.75,2.42,16.128,16.128,0,0,1,5.826,7.075,16,16,0,0,1,.937,3.019,16.2,16.2,0,0,1,.327,3.241v34.39A15.923,15.923,0,0,0,72.45,55.424,16.279,16.279,0,0,0,84.022,82.948H121.9a16.3,16.3,0,0,1-2.1.136h-36.4v34.842a16.2,16.2,0,0,1-.327,3.241,15.992,15.992,0,0,1-2.42,5.75,16.127,16.127,0,0,1-7.075,5.826,16,16,0,0,1-3.019.937A16.2,16.2,0,0,1,67.325,134.006Z" transform="translate(0 0)" fill="#fff" />
                <g id="Group_10094" data-name="Group 10094" transform="translate(64.86 45.402)">
                    <g id="Mask_Group_11" data-name="Mask Group 11" transform="translate(40.095 0)" clip-path="url(#clip-path)">
                        <path id="Line_23" data-name="Line 23" d="M-95.185-126.463a9.112,9.112,0,0,0,9.116-9.088,9.112,9.112,0,0,0-9.116-9.088h-40.339a9.112,9.112,0,0,0-9.116,9.088,9.112,9.112,0,0,0,9.116,9.088h40.339m0,5.36h-40.339A14.462,14.462,0,0,1-150-135.551,14.462,14.462,0,0,1-135.524-150h40.339a14.462,14.462,0,0,1,14.476,14.449A14.462,14.462,0,0,1-95.185-121.1Z" transform="translate(115.319 156.724)" fill="#ff6464" />
                    </g>
                    <g id="Mask_Group_12" data-name="Mask Group 12" transform="translate(0 3.109)" clip-path="url(#clip-path-2)">
                        <path id="Line_23-2" data-name="Line 23" d="M-95.185-121.1h-40.339A14.462,14.462,0,0,1-150-135.551,14.462,14.462,0,0,1-135.524-150h40.339a14.462,14.462,0,0,1,14.476,14.449A14.462,14.462,0,0,1-95.185-121.1Z" transform="translate(155.521 153.615)" fill="#ff6464" />
                    </g>
                </g>
            </g>    </svg>
    )
}