/* eslint-disable react/prop-types */

const One = ({ translateValues, isIndividualComponent, fillColor }) => {
  // #3C2C23
  const x = translateValues?.x || "24";
  const y = translateValues?.y || "12";

  const Path = () => (
    <g transform={`translate(${x}, ${y})`} className="hairGroup">
      <path
        className="hair"
        d="M50.7804 21.3453 C51.299 20.7404 51.4762 19.7716 51.2202 18.8923C51.0167 18.1866 50.5637 17.6546 49.9401 17.3802C50.1567 17.1226 50.5506 16.5401 50.5572 15.7224C50.5769 14.4175 49.9401 13.4654 48.6074 12.8158C49.0735 10.9732 47.7671 9.02424 45.686 8.46417C45.6597 7.5065 45.1739 6.56003 44.3336 5.85999C43.5392 5.19913 42.5348 4.82949 41.491 4.82387C41.1627 3.9278 40.4078 3.14933 39.4033 2.67892C38.4383 2.23085 37.3616 2.11326 36.3638 2.34847C35.2149 0.785923 32.7596 0.21465 30.8755 1.07153C29.7397 0.0802303 27.9803 -0.266955 26.4573 0.214674C26.2931 0.270691 26.0174 0.393902 25.8205 0.489104C25.6235 0.393902 25.3543 0.270691 25.1837 0.214674C23.6606 -0.266955 21.9012 0.0802303 20.7654 1.07153C18.8813 0.21465 16.426 0.785923 15.2772 2.34847C14.2727 2.11326 13.2026 2.22526 12.2376 2.67892C11.2332 3.14933 10.4782 3.92218 10.1499 4.82387C9.10611 4.82963 8.10168 5.19351 7.30732 5.85999C6.47357 6.56003 5.9812 7.50088 5.95494 8.46417C3.88042 9.02424 2.56743 10.9732 3.03354 12.8158C1.70742 13.4654 1.06406 14.4175 1.08375 15.7224C1.09689 16.5345 1.49078 17.1226 1.70086 17.3802C1.07719 17.6602 0.624209 18.1922 0.420695 18.8923C0.164663 19.7716 0.341913 20.7404 0.860547 21.3453C-0.373661 22.6278 -0.275191 24.4536 1.12314 25.8537C0.637336 26.6041 0.479781 27.4722 0.84085 28.5643C1.35948 29.97 2.70529 30.1773 2.70529 30.1773C1.91093 31.7398 3.31583 33.98 4.41218 34.2992C4.41218 34.2992 5.50852 21.2725 9.13894 17.3746C9.52627 17.705 10.255 18.3098 11.673 18.0634C12.9072 17.8506 13.4127 17.4922 13.7672 16.8929C13.8854 17.4194 14.2268 17.9066 14.7782 18.237C15.9008 18.9091 17.4698 18.6795 18.2642 17.7218C18.3496 17.621 18.4152 17.509 18.4743 17.4026C18.7763 18.2818 19.4853 18.9763 20.621 19.1107C21.7436 19.2395 22.8006 18.7803 23.3783 18.0186C23.6409 18.3938 24.409 19.3291 25.8073 19.3291C27.2122 19.3291 28.0263 18.3938 28.2889 18.0186C28.8666 18.7803 29.9235 19.2451 31.0461 19.1107C32.1819 18.9763 32.8449 18.2818 33.1469 17.4026C33.206 17.5146 33.2717 17.621 33.357 17.7218C33.7415 18.1819 34.3233 18.494 34.9759 18.5905C35.6285 18.6869 36.2994 18.5599 36.843 18.237C37.3728 17.9187 37.7356 17.4364 37.854 16.8929C38.2019 17.4866 38.8256 18.1586 40.5784 17.985C41.9505 17.8506 42.4823 17.0497 42.4823 17.0497C45.5415 20.1916 47.2484 34.2992 47.2484 34.2992C48.1347 34.0248 49.277 32.0926 49.3098 30.3845C50.2289 29.9196 50.8526 29.2308 51.0627 28.2003C51.2793 27.1698 50.9904 26.6041 50.5046 25.8537C51.9161 24.4536 52.0146 22.6278 50.7804 21.3453Z"
        fill={fillColor}
      />
    </g>
  );

  if (isIndividualComponent)
    return (
      <svg width="51.64" height="34.3">
        <Path />
      </svg>
    );

  return <Path />;
};

export default One;