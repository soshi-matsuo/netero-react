const Login = () => {
    return (
        <div>
            <h1 className="mt-6 title is-4 has-text-centered">Neteroを使うには認証が必要です</h1>
            <div className="columns mt-4">
                <div className="column is-one-fifth is-offset-two-fifths is-half-mobile is-offset-one-quarter-mobile">
                    <a className="button is-primary is-fullwidth" href="https://netero.jp.auth0.com/authorize?response_type=token&client_id=PStSWdvj7dggxO2TAOWtV2bjC8nwi5dl&redirect_uri=http://localhost:3000&nonce=safsaf&audience=https://netero-implicit-auth.jp">ログイン</a>
                </div>
            </div>
        </div>
    )
}

export default Login;