import { css } from 'styled-components'

export const responsiveVar = css`
  :root {
    --indent: 1; // for margin and padding
    --indent-high: 1;
    --title: 1; // for title font-size
    --text: 1; // for regular text which size less than 20px font-size
    --size: 1; // for element width, height
    --column-width: 100vw / 64; // column width

    //fonts
    --sofia-soft: 'Sofia Pro Soft', sans-serif;
    --sofia-pro: 'Sofia Pro', sans-serif;
    --abyss: 'abyssopelagic', sans-serif;
    --poppins: 'Poppins Black', sans-serif;
    --border: thin solid crimson;
    --raisonne: 'raisonne-light';
    --raisonne-b: 'raisonne-bold';
    --raisonne-br: 'raisonne-bolder';
    


    //colors
    --p-color: #ffffff;
    --s-color: #ffffff;
    --accent300: #ff8a65;
    --accent400: #ff7043;
    --accent500: #ff5722;
    --accent600: #f4511e;
    --accent700: #e64a19;
    --accent800: #d84315;
    --accent900: #bf360c;

    @media screen and (max-width: 1025px) {
      --indent-high: 0.9;
      --title: 0.9;
      --text: 0.9;
    }

    @media screen and (max-width: 768px) {
      --indent: 0.7;
      --indent-high: 0.6;
      --title: 0.8;
      --size: 0.8;
      --text: 0.8;

    }
    @media screen and (max-width: 576px) {
      --indent: 0.5;
      --indent-high: 3.5;
      --title: 0.6;
      --size: 0.7;
    }

    @media screen and (min-width: 1600px) {
      --indent: 1.25;
      --title: 1.25;
      --text: 1.25;
      --size: 1.25;
    }

    @media (min-width: 50em) {
      :root {
        font-size: 1.125em !important;
      }
    }
  }
`


