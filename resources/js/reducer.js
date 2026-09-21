import { combineReducers } from 'redux'

import auth from './redux/auth'
import drawer from './redux/drawer'
import user from './redux/user'

import debrisMaterial from './redux/debrisMaterial'
import debrisType from './redux/debrisType'
import debrisSize from './redux/debrisSize'
import debrisThickness from './redux/debrisThickness'
import debrisHabitat from './redux/debrisHabitat'
import debrisRugosity from './redux/debrisRugosity'
import debrisCategory from './redux/debrisCategory'
import debrisSubCategory from './redux/debrisSubCategory'

import taxaLevel from './redux/taxaLevel'
import taxaSpeciesStatus from './redux/taxaSpeciesStatus'
import taxaPopulationStatus from './redux/taxaPopulationStatus'
import taxaAbundance from './redux/taxaAbundance'
import taxaViability from './redux/taxaViability'
import taxaMaturity from './redux/taxaMaturity'
import taxaNativeRegion from './redux/taxaNativeRegion'

import siteCountry from './redux/siteCountry'
import siteLme from './redux/siteLme'
import siteRegion from './redux/siteRegion'
import site from './redux/site'

import report from './redux/report'
import collection from './redux/collection'
import repository from './redux/repository'

const reducer = combineReducers({
    auth,
    user,
    drawer,

    siteCountry,
    siteLme,
    siteRegion,
    site,

    debrisMaterial,
    debrisType,
    debrisSize,
    debrisThickness,
    debrisHabitat,
    debrisRugosity,
    debrisCategory,
    debrisSubCategory,

    taxaLevel,
    taxaSpeciesStatus,
    taxaPopulationStatus,
    taxaAbundance,
    taxaViability,
    taxaMaturity,
    taxaNativeRegion,

    report,
    collection,
    repository

})

export default reducer