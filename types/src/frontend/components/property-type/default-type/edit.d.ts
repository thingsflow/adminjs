import React from 'react';
import { DefaultTheme } from 'styled-components';
import { EditPropertyProps } from '../base-property-props';
declare type CombinedProps = EditPropertyProps & {
    theme: DefaultTheme;
};
declare const _default: React.ForwardRefExoticComponent<Pick<CombinedProps, "filter" | "onChange" | "property" | "resource" | "record" | "where"> & {
    theme?: DefaultTheme | undefined;
}>;
export default _default;
