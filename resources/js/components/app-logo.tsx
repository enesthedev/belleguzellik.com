import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex aspect-square size-20 items-center justify-center rounded-md group-data-[collapsible=icon]:size-8">
            <AppLogoIcon className="size-20 object-contain group-data-[collapsible=icon]:size-8" />
        </div>
    );
}
