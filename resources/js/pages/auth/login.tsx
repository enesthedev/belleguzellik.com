import InputError from '@/components/forms/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { Form, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Layout from './layout';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status, canRegister }: LoginProps) {
    const { t } = useTranslation();

    return (
        <Layout
            title={t('Log in to your account')}
            description={t('Enter your email and password to log in')}
        >
            <Head title={t('Log in')} />

            <Form
                {...store.post()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <FloatingLabelInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    label={t('Your email address')}
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    error={!!errors.email}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <FloatingLabelInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    label={t('Your password')}
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    error={!!errors.password}
                                />
                                <InputError message={errors.password} />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                                variant={'secondary'}
                            >
                                {processing && <Spinner />}
                                {t('Log in')}
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                {t("Don't have an account?")}{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    {t('Sign up')}
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </Layout>
    );
}
