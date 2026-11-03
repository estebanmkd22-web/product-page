import json, copy
base = json.load(open('preview/paginas/arven-fold.json'))
AC, AC2, TX, TX2, F1, F2, SALVIA = '#2c4a35', '#3d6148', '#1f2a22', '#5a645c', '#f5f3ee', '#e3e8df', '#8fa592'

def sec(d, tipo): return [s for s in d['secciones'] if s['tipo'] == tipo][0]
def blk(t, **kw): return {"type": t, "settings": kw}

H = {
 'a': dict(
   nombre='ARVEN Men · Hipótesis A (roce)',
   hero_titulo='Que el roce <em>no te frene la jornada.</em>',
   hero_bullets=[
     '<strong>Menos roce al caminar:</strong> una capa ligera protege la cara interna del muslo durante toda la jornada.',
     '<strong>Aguanta el trabajo pesado:</strong> calle, moto u obra, con menos fricción y menos peladuras.',
     '<strong>Seco aunque sudes:</strong> se seca sobre la piel y no atrapa más sudor.',
     '<strong>Ni grasa ni grumos:</strong> no pega como la vaselina ni se apelmaza como el talco.'],
   oferta='Tu jornada <em>con menos roce</em>',
   videos=('Hombres que <em>ya no se rozan</em>', 'Así la usan en su jornada.'),
   dolores_titulo='“Siempre me he rozado. <em>Es normal.</em>”',
   dolores_texto='No lo es. Caminar todo el día con humedad y calor termina en peladuras, y lo de siempre no fue hecho para esa zona.',
   dolores_cierre='No es solo sudor: <em>es roce todo el día.</em>',
   galeria=('Donde tu jornada aprieta, <em>ARVEN aguanta</em>', 'Un tubo para todo el día.'),
   resenas='“Ya camino toda la jornada <em>sin rozarme.</em>”',
   garantia='Menos roce en tu jornada, o te devolvemos tu dinero',
   pie='Menos roce, todo el día',
   fijo='La quiero',
 ),
 'b': dict(
   nombre='ARVEN Men · Hipótesis B (humedad y olor)',
   hero_titulo='Una capa en la mañana. <em>Seco hasta la noche.</em>',
   hero_bullets=[
     '<strong>Seco desde temprano:</strong> una capa después del baño y la entrepierna se siente seca aunque apriete el calor.',
     '<strong>Ayuda a controlar el mal olor:</strong> menos humedad acumulada, menos olor a media tarde.',
     '<strong>Nadie lo nota:</strong> acabado seco, sin brillo ni sensación grasosa.',
     '<strong>Ni grasa ni grumos:</strong> no pega como la vaselina ni se apelmaza como el talco.'],
   oferta='Tu entrepierna <em>seca hasta la noche</em>',
   videos=('Mira cómo <em>se seca sobre la piel</em>', 'Así se ve en el día a día.'),
   dolores_titulo='“Ya uso talco. <em>Aguanto un rato.</em>”',
   dolores_texto='Un rato no alcanza. A media tarde vuelve la humedad, el olor y las ganas de acomodarte la ropa.',
   dolores_cierre='No es solo sudor: <em>es humedad atrapada todo el día.</em>',
   galeria=('Donde el calor aprieta, <em>tú sigues seco</em>', 'Un tubo para todo el día.'),
   resenas='“Llego a la noche <em>seco y sin olor.</em>”',
   garantia='Seco hasta la noche, o te devolvemos tu dinero',
   pie='Seco hasta la noche',
   fijo='Lo quiero',
 ),
}

for k, h in H.items():
    d = copy.deepcopy(base)
    d['titulo'] = h['nombre']
    d['head_extra'] = "<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&display=swap'><style>:root{--pp-font-titulos:'Barlow Condensed',sans-serif;--pp-peso-titulos:700;--pp-espaciado-titulos:0}</style>"
    d['producto'] = {"title": "ARVEN Comfort Cream Men", "featured_image": {"src": "../../imagenes/arven/g1.jpg"},
        "selected_or_first_available_variant": {"id": 1, "price": 8990000, "compare_at_price": 0, "available": True}, "media": []}
    out = []
    for s in d['secciones']:
        t = s['tipo']; st = s.setdefault('settings', {})
        if t == 'pp-estilos':
            st.update(acento=AC, texto=TX, texto_2=TX2, fondo=F1, fondo_2=F2, boton=AC, boton_texto='#ffffff', estrella='#c99a3b', ok='#4f7a52', radio=14)
        elif t == 'pp-logo':
            st.update(imagen={"src": "../../imagenes/arven/arven-logo.png", "alt": "ARVEN"}, ancho_movil=130, ancho_pc=160)
        elif t == 'pp-ticker':
            st.update(fondo=AC, texto='#ffffff')
            s['blocks'] = [blk('mensaje', texto=x) for x in ['Envío GRATIS a toda Colombia', 'Pagas al recibir', 'Te llega en 3 a 5 días', 'Garantía de satisfacción 60 días']]
        elif t == 'pp-hero-oferta':
            st.update(fondo=F1, titulo=h['hero_titulo'], texto='', zonas_titulo='', zonas='',
                      imagen_1={"src": "../../imagenes/arven/g1.jpg"}, imagen_2={"src": "../../imagenes/arven/g2.jpg"},
                      imagen_3={"src": "../../imagenes/arven/g3.jpg"}, imagen_4={"src": "../../imagenes/arven/g4.jpg"})
            s['blocks'] = [blk('beneficio', texto=x) for x in h['hero_bullets']]
        elif t == 'pp-iconos':
            s['blocks'] = [blk('icono', icono='gota', texto='Acabado seco'), blk('icono', icono='escudo', texto='Menos roce'), blk('icono', icono='frescura', texto='Sin grasa')]
        elif t == 'pp-oferta-tabs':
            st.update(color_acento=AC, color_pestana=AC, titulo=h['oferta'], entrega='Te llega en 3 a 5 días · Envío gratis',
                      etiquetas_titulo='Ideal para', etiquetas='Trabajo en la calle, Moto, Gimnasio, Clima caliente')
            s['blocks'] = [
              blk('pack', pestana='1 crema', etiqueta='Para empezar', titulo='1 Comfort Cream', linea_regalo='🎁 Con los 4 beneficios incluidos', detalle='1 tubo de 100 g', precio=89900, precio_antes=0, cantidad=1),
              blk('pack', pestana='2 cremas', destacar='Más elegido', etiqueta='Más de 2 meses cubierto', titulo='2 Comfort Cream', linea_regalo='🎁 Con los 4 beneficios incluidos', detalle='2 tubos de 100 g · $74.950 c/u', precio=149900, precio_antes=0, cantidad=2, preseleccionado=True),
              blk('regalo', insignia='Gratis', icono='camion', titulo='Envío gratis', texto='A toda Colombia'),
              blk('regalo', insignia='Incluido', icono='pago', titulo='Pagas al recibir', texto='Nada por adelantado'),
              blk('regalo', insignia='Gratis', icono='manual', titulo='Guía de cuidado', texto='Para el sudor y el roce'),
              blk('regalo', insignia='Incluido', icono='escudo', titulo='Garantía 60 días', texto='Si no te funciona, te devolvemos tu dinero')]
        elif t == 'pp-carrusel-imagenes':
            s = {"tipo": "pp-videos", "settings": {"titulo": h['videos'][0], "texto": h['videos'][1]},
                 "blocks": [blk('video', etiqueta=x) for x in ['Cómo aplicarla', 'Acabado seco', 'En la jornada', 'Opinión real']]}
        elif t == 'pp-resultados-zona':
            st.update(color_acento=AC, etiqueta='Resultados', titulo='Tu día, <em>seco y sin roce</em>', texto='Elige tu jornada.')
            s['blocks'] = [
              blk('zona', zona='En la calle', titulo='Aguanto toda la jornada', texto='Camino todo el día y terminaba pelado en el muslo. Ahora me la pongo en la mañana y llego a la noche más seco.', nombre='Testimonio de ejemplo'),
              blk('zona', zona='En moto', titulo='Menos humedad sentado', texto='Horas en la moto con el calor y la entrepierna se mojaba. Con ARVEN la siento seca y sin ese roce.', nombre='Testimonio de ejemplo'),
              blk('zona', zona='En el gym', titulo='Entreno sin rozarme', texto='En pierna siempre terminaba rozado. Se seca rápido y no se siente grasosa.', nombre='Testimonio de ejemplo'),
              blk('zona', zona='En la oficina', titulo='Ya no me acomodo', texto='Con el pantalón de tela me tocaba acomodarme a cada rato. Ahora no lo pienso.', nombre='Testimonio de ejemplo')]
        elif t == 'pp-grid-dolores':
            st.update(titulo=h['dolores_titulo'], texto=h['dolores_texto'], cierre=h['dolores_cierre'])
            s['blocks'] = [
              blk('item', titulo='Talco', texto='Absorbe un rato, pero con el sudor se hace pasta y grumos.'),
              blk('item', titulo='Vaselina', texto='Grasosa: se queda encima y atrapa más sudor.'),
              blk('item', titulo='Antitranspirante', texto='Bloquea el sudor un rato, pero no está hecho para la entrepierna.'),
              blk('item', titulo='Aguantar', texto='Acomodarte la ropa todo el día y terminar pelado.')]
        elif t == 'pp-galeria-ideas':
            st.update(color_fondo=F2, color_texto=TX, color_acento=AC, etiqueta='Dónde se usa', titulo=h['galeria'][0], texto=h['galeria'][1])
            s['blocks'] = [
              blk('idea', etiqueta='Calle', titulo='Jornadas a pie', texto='Menos roce al caminar todo el día.'),
              blk('idea', etiqueta='Moto', titulo='Horas sentado', texto='Menos humedad atrapada con el calor.'),
              blk('idea', etiqueta='Gym', titulo='Entrenamiento', texto='Seco aunque sudes, sin la pasta del talco.'),
              blk('idea', etiqueta='Calor', titulo='Clima caliente', texto='Una capa en la mañana y sigues tu día.')]
        elif t == 'pp-timeline':
            st.update(color_tarjeta=AC, titulo='De crema a seco <em>en minutos</em>')
        elif t == 'pp-problemas-filas':
            st.update(color_fondo=F2, color_tarjeta='#ffffff', color_acento=AC, color_dorado=SALVIA, color_texto=TX)
        elif t == 'pp-libre':
            st.update(color_texto=TX, color_fondo=F2)
        elif t == 'pp-pasos':
            s['blocks'] = [blk('paso', titulo='Después del baño', texto='Sobre la piel limpia y bien seca.'),
                           blk('paso', titulo='Una capa ligera', texto='En la ingle y la cara interna de los muslos.'),
                           blk('paso', titulo='Déjala secar y vístete', texto='En minutos queda seca. Sigue tu día.')]
        elif t == 'pp-esperar':
            st.update(color_acento=AC, color_icono=SALVIA)
            s['blocks'] = [
              blk('etapa', icono='reloj', periodo='En 60 segundos', texto='Se siente fresca al aplicarla y se seca sobre la piel: sin sensación grasosa ni pegajosa.'),
              blk('etapa', icono='calendario', periodo='Día 1', texto='La entrepierna se mantiene seca por más tiempo y sientes menos roce en la jornada.'),
              blk('etapa', icono='calendario', periodo='Día 2-3', texto='La piel se siente más cómoda y menos irritada por el sudor y el calor.'),
              blk('etapa', icono='calendario', periodo='Semana 1', texto='Ya es parte de tu rutina: te vistes y no vuelves a pensar en el roce.'),
              blk('etapa', icono='calendario', periodo='Uso continuo', texto='Mantén la entrepierna seca y cómoda, incluso en los días de más calor.')]
        elif t == 'pp-comparativa':
            st.update(texto='Frente al talco y la vaselina.', color_destacado=AC, sub_a='Comfort Cream', nombre_b='Talco o vaselina', pie_der=h['pie'])
            s['blocks'] = [
              blk('fila', titulo='Acabado', subtitulo='Cómo queda en la piel', ok_a=True, valor_a='Seco', ok_b=False, valor_b='Pasta o grasa'),
              blk('fila', titulo='Con el sudor', subtitulo='Durante el día', ok_a=True, valor_a='Sigue seco', ok_b=False, valor_b='Se apelmaza'),
              blk('fila', titulo='Roce', subtitulo='Al caminar', ok_a=True, valor_a='Barrera de zinc', ok_b=False, valor_b='Poco o nada'),
              blk('fila', titulo='Piel irritada', subtitulo='Sensación', ok_a=True, valor_a='Calma', ok_b=False, valor_b='Puede arder'),
              blk('fila', titulo='Hecha para', subtitulo='La zona', ok_a=True, valor_a='La entrepierna', ok_b=False, valor_b='Otra cosa')]
        elif t == 'pp-resenas':
            st.update(titulo=h['resenas'])
            s['blocks'] = [
              blk('resena', estrellas=5, titulo='Adiós al talco', texto='Usaba talco y con el calor se me hacía pasta. Esta se seca rápido y aguanta la jornada.', nombre='Testimonio de ejemplo', ciudad='Barranquilla', verificado=False),
              blk('resena', estrellas=5, titulo='No es grasosa', texto='Pensé que iba a ser como la vaselina y no: se seca y no se siente.', nombre='Testimonio de ejemplo', ciudad='Cali', verificado=False),
              blk('resena', estrellas=5, titulo='Para la moto', texto='Paso el día en la moto y ya no termino con la entrepierna húmeda y rozada.', nombre='Testimonio de ejemplo', ciudad='Medellín', verificado=False)]
        elif t == 'pp-faq':
            s['blocks'] = [
              blk('pregunta', pregunta='Andrés de Cali pregunta: ya probé talco y vaselina, ¿por qué esta sería diferente?', respuesta='<p>Porque el talco con el sudor se hace pasta y la vaselina atrapa más humedad. ARVEN <strong>se aplica como crema y se seca sobre la piel</strong>: absorbe la humedad y deja una barrera contra el roce.</p>'),
              blk('pregunta', pregunta='Jhon de Bogotá pregunta: ¿queda grasosa o pegajosa?', respuesta='<p>No. Es una capa ligera que se seca en minutos. Te puedes vestir enseguida.</p>'),
              blk('pregunta', pregunta='Carlos de Medellín pregunta: ¿me va a arder si ya estoy rozado?', respuesta='<p>Tiene hamamelis y glicerina vegetal para calmar la piel, y es <strong>sin corticoides</strong>. No la apliques sobre heridas abiertas, y si notas molestia, suspende su uso.</p>'),
              blk('pregunta', pregunta='Diego de Bucaramanga pregunta: ¿sirve para los hongos?', respuesta='<p>No es un tratamiento para hongos. Ayuda a mantener la entrepierna <strong>seca y protegida del roce</strong>. Si tienes una infección, consulta con tu médico.</p>'),
              blk('pregunta', pregunta='Fabián de Cartagena pregunta: ¿cuánto me dura un tubo?', respuesta='<p>Con uso diario, un tubo de 100 g rinde más de 30 días.</p>'),
              blk('pregunta', pregunta='Mauricio de Ibagué pregunta: ¿cómo pago y cuándo me llega?', respuesta='<p>Pagas en efectivo cuando la recibes. Te llega en <strong>3 a 5 días</strong> y el envío es <strong>gratis a toda Colombia</strong>.</p>'),
              blk('pregunta', pregunta='Sebastián de Pereira pregunta: ¿y si no me funciona?', respuesta='<p>Tienes <strong>garantía de satisfacción de 60 días</strong>: si no te funciona, te devolvemos tu dinero.</p>')]
        elif t == 'pp-garantia':
            st.update(color_tarjeta=AC, color_sello=AC, titulo=h['garantia'], texto='Pruébala 60 días. Si no te funciona, te devolvemos tu dinero. Envío gratis, te llega en 3 a 5 días y pagas al recibir.')
        elif t == 'pp-boton-fijo':
            st.update(boton_texto=h['fijo'], precio_manual=149900)
        out.append(s)
    d['secciones'] = out
    json.dump(d, open(f'preview/paginas/arven-{k}.json', 'w'), ensure_ascii=False, indent=2)
    print('ok', k, [s['tipo'] for s in out])
