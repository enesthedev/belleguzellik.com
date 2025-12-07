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
            title={t('auth.login.title')}
            description={t('auth.login.description')}
        >
            <Head title={t('auth.login.submit')} />

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
                                    label={t('common.email_placeholder')}
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
                                    label={t('common.password_placeholder')}
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
                                {t('auth.login.submit')}
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                {t('auth.login.no_account')}{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    {t('auth.login.sign_up')}
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
