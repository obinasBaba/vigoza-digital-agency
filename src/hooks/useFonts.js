import {useLayoutEffect} from 'react'
import FontLoaded from 'fontfaceobserver'

const useLoadingFonts = ( setFontFinish, deps) => {


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


                }, 0)
            })
            .catch(console.error)

        return () => {
        }
    }, deps)
}

export default useLoadingFonts;