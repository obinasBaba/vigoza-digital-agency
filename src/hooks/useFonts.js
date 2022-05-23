import {useLayoutEffect} from 'react'
import FontLoaded from 'fontfaceobserver'
import { useUI } from "../contexts/UIStateContext";

const useLoadingFonts = ( setFontFinish, deps) => {

    const { hideLoadingPage } = useUI();


    useLayoutEffect(() => {

        let rBold = new FontLoaded('raisonne-bold')
        let rBolder = new FontLoaded('raisonne-bolder')
        let rLight = new FontLoaded('raisonne-light')
        let poppins = new FontLoaded('Poppins')
        let abyssopelagic = new FontLoaded('abyssopelagic')

        Promise.all([rBold.load(), poppins.load(),
            rBolder.load(), rLight.load(), abyssopelagic.load()])

            .then(() => {
                setTimeout(() => {

                    setFontFinish(true)
                    hideLoadingPage();


                }, 1500)
            })
            .catch(console.error)

        return () => {
        }
    }, deps)
}

export default useLoadingFonts;
