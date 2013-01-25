<?php

class __blinkdesign_5b11d03419acc06d9fca2b38cc9339f3 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '', $escape = false)
    {
        $buffer = '';

        $buffer .= $indent . '<article class="excerpt">';
        $buffer .= "\n";
        $buffer .= $indent . '    <header class="excerpt-title post-title">';
        $buffer .= "\n";
        $buffer .= $indent . '        <h1 class="hdr hdr-post excerpt-hdr"><a href="';
        $value = $context->find('url');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
        $buffer .= '" class="ajax">';
        $value = $context->find('title');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</a></h1>';
        $buffer .= "\n";
        $buffer .= $indent . '        ';
        // 'has_date' section
        $buffer .= $this->section68b1268d6acfc5d86c33e06bf87a5f60($context, $indent, $context->find('has_date'));
        $buffer .= "\n";
        $buffer .= $indent . '    </header>';
        $buffer .= "\n";
        $buffer .= $indent . '    <p>';
        $value = $context->find('excerpt');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</p>';
        $buffer .= "\n";
        $buffer .= $indent . '    ';
        // 'has_image' section
        $buffer .= $this->section388c7928bb19bf0c57cd0dbe7b5e8e48($context, $indent, $context->find('has_image'));
        $buffer .= "\n";
        $buffer .= $indent . '</article>';
        $buffer .= "\n";

        if ($escape) {
            return htmlspecialchars($buffer, ENT_COMPAT, 'UTF-8');
        } else {
            return $buffer;
        }
    }

    private function section68b1268d6acfc5d86c33e06bf87a5f60(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '<time class="post-date" datetime="{{w3c_date}}">{{date}}</time>';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= '<time class="post-date" datetime="';
                $value = $context->find('w3c_date');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '">';
                $value = $context->find('date');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '</time>';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section388c7928bb19bf0c57cd0dbe7b5e8e48(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '<a href="{{url}}" class="work-img work-img-mini">{{{image}}}</a>';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= '<a href="';
                $value = $context->find('url');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '" class="work-img work-img-mini">';
                $value = $context->find('image');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= $value;
                $buffer .= '</a>';
                $context->pop();
            }
        }
    
        return $buffer;
    }
}