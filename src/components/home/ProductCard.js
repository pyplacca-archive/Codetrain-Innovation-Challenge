import styled from 'styled-components';

export default function Card({onClick=()=>{}, ...props}) {
	/*
		accepts all information related to a product item
		@prop<selected>
			used to highlight the card when selected

	*/
	return (
		<CardContainer
			highlight={ props?.selected }
			onClick={ onClick }
		>
			<img src={ props?.image } alt="" className='card--product-image'/>
			<div className='card-bottom'>
				<div className="card-bottom--lead">
					<h4 className='card--product-name'>{ props?.name || "No name"}</h4>
					<p className='card--product-price'>GHC { props?.price?.toFixed(2) }</p>
				</div>
				<Tag className='card--product-tag'>{ props?.tags?.[0] }</Tag>
			</div>
		</CardContainer>
	)
}

const CardContainer = styled.div`
	width: var(--card-width);
	border-radius: 1rem;
	background-color: #fff;
	border: 2px solid ${props => props.highlight ? 'var(--artis-blue)' : 'transparent'};
	overflow: hidden;
	cursor: pointer;
	transition: border-color .15s ease-in-out;
	display: flex;
	flex-direction: column;

	.card--product-image {
		width: 100%;
		height: 7rem;
		object-fit: cover;
		transition: all .15s ease-in;
	}

	.card-bottom {
		padding: var(--pad-s);
		display: flex;
		flex-direction: column;
		flex-grow: 1;

		.card-bottom--lead {
			margin-bottom: var(--pad-m);

			> * {
				margin-bottom: calc(var(--pad-s) / 2);
			}
		}

		.card--product-tag {
			align-self: flex-end;
			margin-top: auto;
		}
	}

	&:hover {
		.card--product-image {
			object-fit: contain;
		}
	}
`;

const Tag = styled.small`
	display: block;
	padding: .25rem;
	border-radius; .25rem;
`;
