import Script from 'next/script'
const MessageButton = () => {
	return (
		<div>
			<Script id='tawk.to' strategy='beforeInteractive'>
				{`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
					(function(){
					var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
					s1.async=true;
					s1.src='https://embed.tawk.to/6813ae4d433f371909f1041c/1iq6e1oc1';
					s1.charset='UTF-8';
					s1.setAttribute('crossorigin','*');
					s0.parentNode.insertBefore(s1,s0);
					})();`}
			</Script>
		</div>
	)
}

export default MessageButton
