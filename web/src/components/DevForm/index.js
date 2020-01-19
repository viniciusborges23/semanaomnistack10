import React, { useEffect, useState } from 'react';
import './styles.css';

function DevForm({ onSubmit }) {
	const [githubUsername, setGithubUsername] = useState('');
	const [techs, setTechs] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;

				setLatitude(latitude);
				setLongitude(longitude);
			},
			err => {
				console.log(err);
			},
			{
				timeout: 30000,
			},
		);
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		await onSubmit({
			github_username: githubUsername,
			techs,
			latitude,
			longitude,
		});

		setGithubUsername('');
		setTechs('');
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='input-block'>
				<label htmlFor='github_username'>Usuário do Github</label>
				<input
					type='text'
					id='github_username'
					name='github_username'
					value={githubUsername}
					onChange={e => setGithubUsername(e.target.value)}
					required
				/>
			</div>

			<div className='input-block'>
				<label htmlFor='techs'>Tecnologias</label>
				<input
					type='text'
					id='techs'
					name='techs'
					value={techs}
					onChange={e => setTechs(e.target.value)}
					required
				/>
			</div>

			<div className='input-group'>
				<div className='input-block'>
					<label htmlFor='latitude'>Latitude</label>
					<input
						type='number'
						id='latitude'
						name='latitude'
						required
						value={latitude}
						onChange={e => setLatitude(e.target.value)}
					/>
				</div>
				<div className='input-block'>
					<label htmlFor='longitude'>Longitude</label>
					<input
						type='number'
						id='longitude'
						name='longitude'
						required
						value={longitude}
						onChange={e => setLongitude(e.target.value)}
					/>
				</div>
			</div>

			<button type='submit'>Salvar</button>
		</form>
	);
}

export default DevForm;
