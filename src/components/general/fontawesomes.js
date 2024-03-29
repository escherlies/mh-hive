import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft'
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faLightbulb from '@fortawesome/fontawesome-free-solid/faLightbulb'
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle'


export const ChevronLeft = props => <FontAwesomeIcon icon={faChevronLeft} {...props} />
export const ChevronRight = props => <FontAwesomeIcon icon={faChevronRight} {...props} />
export const CaretDown = props => <FontAwesomeIcon icon={faCaretDown} {...props} />
export const LightBulb = props => <FontAwesomeIcon icon={faLightbulb} {...props} />
export const TimesCircle = props => <FontAwesomeIcon icon={faTimesCircle} {...props} />
